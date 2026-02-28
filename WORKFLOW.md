# Publications Management Guide

## 1. Directory Structure

- `_data/publications.yml`: Contains the structured data for all publications.
- `assets/images/publications/`: Directory for storing publication preview images.

## 2. Adding a Publication

1. Save the preview image (e.g., `paper-2026.jpg`) to `assets/images/publications/`.
2. Add a new entry to `_data/publications.yml` using the exact format below:

```yaml
- image: "paper-2026.jpg"
  selected: true # true: show on both homepage and publications page; false: publications page only
  date: "2026-12" # Format: YYYY-MM. Used for chronological sorting.
  title: "Full Paper Title"
  venue_html: "<strong>Conference/Journal Name</strong> (e.g., CCF-A, Oral)"
  links:
    - label: "Project"
      url: "https://project-url.com"
    - label: "arXiv"
      url: "https://arxiv.org/abs/1234.5678"
    - label: "Code"
      url: "https://github.com/user/repo"
  abstract: "Abstract or short description of the paper."
```

## 3. Auto-Updating arXiv Dates

A Python script is included to automatically fetch and update the publication `date` field based on its arXiv link. This ensures accurate chronological sorting without manual entry.

**Requirement:** The publication entry in `_data/publications.yml` must contain a link with the exact `label: "arXiv"`.

**Command:**
```bash
python3 update_dates.py
```
This script will:
1. Parse `_data/publications.yml`.
2. Fetch the latest publishing date from the arXiv API for matching entries.
3. Overwrite the `date` field in the YAML file automatically.

## 4. Hiding a Publication

To temporarily or permanently remove a publication from the website, comment out the entire block in `_data/publications.yml` by prefixing each line with `#`:

```yaml
# - image: "old-paper.png"
#   selected: false
#   date: "2020-01"
#   title: "Old Paper Title"
#   venue_html: "..."
```
