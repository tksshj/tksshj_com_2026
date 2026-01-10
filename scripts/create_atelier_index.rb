require "json"
require "fileutils"

project_dir = Pathname(__dir__).expand_path.parent
atelier_dir = project_dir / "app" / "atelier"
index_json_path = atelier_dir / "_components" / "index.json"

index = []

atelier_dir
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

    index << { path: "/atelier/#{item.basename}", title: json[:title], description: json[:description] }
  end

index_json_path.write JSON.pretty_generate(index)
