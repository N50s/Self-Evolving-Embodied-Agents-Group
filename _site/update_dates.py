import yaml
import requests
import xml.etree.ElementTree as ET
import re
import sys
import os
from datetime import datetime

def fetch_arxiv_date(arxiv_id):
    """Fetches the published date from arXiv API for a given ID."""
    url = f"http://export.arxiv.org/api/query?id_list={arxiv_id}"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        root = ET.fromstring(response.content)
        
        # arXiv API uses the Atom namespace
        namespace = {'atom': 'http://www.w3.org/2005/Atom'}
        entry = root.find('atom:entry', namespace)
        
        if entry is not None:
            # We use 'published' date. You could also use 'updated'.
            published = entry.find('atom:published', namespace).text
            # Parse '2024-12-16T18:31:01Z' to '2024-12-16'
            date_obj = datetime.strptime(published, "%Y-%m-%dT%H:%M:%SZ")
            return date_obj.strftime("%Y-%m-%d")
        else:
            print(f"  [Warning] No entry found for arXiv ID {arxiv_id}")
            return None
    except Exception as e:
        print(f"  [Error] Failed to fetch arXiv info for {arxiv_id}: {e}")
        return None

def extract_arxiv_id(url):
    """Extracts the arXiv ID from a URL."""
    # Matches formats like https://arxiv.org/abs/2412.09213 or http://arxiv.org/abs/2412.09213v1
    match = re.search(r'arxiv\.org/abs/([0-9]+\.[0-9]+(?:v\d+)?)', url)
    if match:
        return match.group(1).split('v')[0] # remove version tag if present to get original publish date
    return None

def main():
    yaml_path = '_data/publications.yml'
    
    if not os.path.exists(yaml_path):
        print(f"Error: {yaml_path} not found.")
        sys.exit(1)

    print(f"Loading {yaml_path}...")
    with open(yaml_path, 'r', encoding='utf-8') as f:
        # ruamel.yaml is better for preserving comments, but standard yaml works if comments aren't strict.
        # Alternatively, we just use PyYAML but be aware it might strip some formatting if we re-dump the whole file.
        # To make it robust without losing formatting, wait: PyYAML's safe_dump does reformat.
        # Let's use it for now as it's standard, and users rely on the content mostly.
        # (For perfect formatting retention we'd need ruamel.yaml, which might not be installed).
        
        # We will just parse, modify, and dump.
        try:
            publications = yaml.safe_load(f)
        except yaml.YAMLError as exc:
            print(f"Error parsing YAML: {exc}")
            sys.exit(1)

    if not publications:
        print("No publications found.")
        return

    updated_count = 0

    for pub in publications:
        title = pub.get('title', 'Unknown Title')
        current_date = pub.get('date', None)
        arxiv_url = None
        
        # Check if we have an arXiv link
        if 'links' in pub and pub['links']:
            for link in pub['links']:
                if link.get('label', '').lower() == 'arxiv':
                    arxiv_url = link.get('url', '')
                    break

        if arxiv_url:
            arxiv_id = extract_arxiv_id(arxiv_url)
            if arxiv_id:
                print(f"Processing '{title[:30]}...' (arXiv ID: {arxiv_id})")
                new_date = fetch_arxiv_date(arxiv_id)
                
                if new_date and new_date != current_date:
                    print(f"  -> Updating date: {current_date} => {new_date}")
                    pub['date'] = new_date
                    updated_count += 1
                elif new_date == current_date:
                    print(f"  -> Date is already up to date ({current_date}).")
        else:
            # No arXiv link, leave date as is or alert
            if not current_date:
                print(f"Processing '{title[:30]}...' - No arXiv link to fetch a date. Please set manually.")

    if updated_count > 0:
        print(f"\nSuccessfully updated {updated_count} publication(s). Saving {yaml_path}...")
        
        class CustomDumper(yaml.SafeDumper):
            # Tell PyYAML how to format lists nicely without weird indentations
            def increase_indent(self, flow=False, indentless=False):
                return super(CustomDumper, self).increase_indent(flow, False)

        with open(yaml_path, 'w', encoding='utf-8') as f:
            # allow_unicode=True keeps Chinese characters intact
            # sort_keys=False keeps the dictionary order
            yaml.dump(publications, f, Dumper=CustomDumper, default_flow_style=False, allow_unicode=True, sort_keys=False)
        print("Done!")
    else:
        print("\nNo dates needed updating.")

if __name__ == "__main__":
    main()
