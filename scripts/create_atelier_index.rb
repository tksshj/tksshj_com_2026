require "json"

project_dir = Pathname(__dir__).expand_path.parent
atelier_dir = project_dir / "app" / "atelier"
json_path = atelier_dir / "_components" / "index.json"

index =
  atelier_dir
    .children
    .select { |pn| pn.directory? && !pn.basename.to_s.start_with?("_") }
    .sort
    .map { |item| { title: item.basename.to_s, path: "/atelier/#{item.basename}" } }

json_path.write JSON.pretty_generate(index)
