require "json"
require "fileutils"

PROJECT_DIR = Pathname(__dir__).expand_path.parent

def atelier_pages
  %w[atelier pages].each do |page|
    index_dir = PROJECT_DIR / "app" / page
    index_json_path = index_dir / "_components" / "index.json"

    index = []

    index_dir
      .children
      .select { |pn| pn.directory? && !pn.basename.to_s.start_with?("_") }
      .sort
      .each do |item|
        components_dir = item / "_components"
        FileUtils.mkdir_p(components_dir)
        json_path = components_dir / "metadata.json"
        json = { title: "", description: "" }
        json = JSON.parse(File.read(json_path), symbolize_names: true) if File.file?(json_path)
        json[:title] = item.basename.to_s
        json_path.write JSON.pretty_generate(json)

        index << { path: "/#{page}/#{item.basename}", title: json[:title], description: json[:description] }
      end

    index_json_path.write JSON.pretty_generate(index)
  end
end

def thoughts
  thoughts_dir = PROJECT_DIR / "app" / "thoughts"
  index_json_path = thoughts_dir / "_components" / "index.json"

  index = []

  thoughts_dir
    .children
    .select { |pn| pn.directory? && !pn.basename.to_s.start_with?("_") }
    .sort
    .each do |item|
      components_dir = item / "_components"

      page_content_path = components_dir / "PageContent.tsx"
      html = File.read(page_content_path)
      title = nil
      if html =~ %r{<h1[^>]*>(.*?)</h1>}m
        title = Regexp.last_match(1)
      else
        title = item.basename.to_s
      end
      FileUtils.mkdir_p(components_dir)
      json_path = components_dir / "metadata.json"
      json = { title: "", description: "" }
      json = JSON.parse(File.read(json_path), symbolize_names: true) if File.file?(json_path)
      json[:title] = title
      json[:description] = item.basename.to_s
      json_path.write JSON.pretty_generate(json)

      index << { path: "/thoughts/#{item.basename}", title: json[:title], description: json[:description] }
    end

  index_json_path.write JSON.pretty_generate(index)
end

atelier_pages
thoughts
