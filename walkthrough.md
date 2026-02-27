# Jekyll Migration Walkthrough

The project has been successfully migrated to Jekyll following recommended best practices. Here is a summary of the changes made:

## Key Changes

1. **Jekyll Setup**: 
   - A [Gemfile](file:///Users/yfn/Downloads/Private%20&%20Shared%203/Gemfile) was added, pinned to Jekyll `~> 3.9` to ensure compatibility with the system's Ruby 2.6 without encountering native extension errors (like Protobuf).
   - Basic settings were placed in [_config.yml](file:///Users/yfn/Downloads/Private%20&%20Shared%203/_config.yml).

2. **Modularized Layouts**:
   - The `<head>`, CSS styles, `<nav>` bar, and `<footer>` elements were extracted into a new template: [_layouts/default.html](file:///Users/yfn/Downloads/Private%20&%20Shared%203/_layouts/default.html). This ensures that any future pages you add will share the exact same style without duplicating code.

3. **Data Extraction**:
   - News items are now cleanly stored in [_data/news.yml](file:///Users/yfn/Downloads/Private%20&%20Shared%203/_data/news.yml).
   - Publication lists are isolated in [_data/publications.yml](file:///Users/yfn/Downloads/Private%20&%20Shared%203/_data/publications.yml).
   - Now, you won't need to write raw HTML just to add a new publication; simply insert a new item block in these YAML data files!

4. **Simplified [index.html](file:///Users/yfn/Downloads/Private%20&%20Shared%203/index.html)**:
   - The homepage [index.html](file:///Users/yfn/Downloads/Private%20&%20Shared%203/index.html) was refactored. It now tells Jekyll to use the `default` layout via YAML front matter.
   - It utilizes Liquid loops (`{% for item in site.data.news %}`) to render the lists, significantly shortening the file and making the content logic crystal clear.

5. **Backup Saved**:
   - Your original fully-static file was archived to `index_archive.html`.

## Verification 

- Ran `bundle install --path vendor/bundle` so all dependencies are locally scoped to the project folder.
- Ran `bundle exec jekyll build` which successfully outputted the static site to the `_site/` directory.
- Reviewed [_site/index.html](file:///Users/yfn/Downloads/Private%20&%20Shared%203/_site/index.html) and verified that data is correctly injected and HTML perfectly matches the legacy format.

## Next Steps for the User

To view your site locally or work on it further, simply run:
```bash
bundle exec jekyll serve
```
Then navigate to `http://127.0.0.1:4000/` in your browser.<!---->
