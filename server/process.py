import re


def process_and_return_graph(text):
    split_text = text.split("->::: ")
    processed_text = split_text[1]
    # print(processed_text)

    # Suppose 'processed_text' is your text containing the relationships
    pattern = "\(([^,]+) \[([^]]+)\], ([^,]+), ([^]]+) \[([^]]+)\]\)"

    matches = re.findall(pattern, processed_text)
    # Dictionary to hold the nodes and their unique IDs
    nodes_dict = {}
    # List to hold the nodes and edges
    nodes = []
    edges = []

    # Assign a unique ID to each entity (node)
    node_id = 1
    edge_id = 1
    for match in matches:
        head, head_type, relation, tail, tail_type = match

        if head not in nodes_dict:
            nodes_dict[head] = node_id
            nodes.append({"id": node_id, "label": head, "title": f"{head}[{head_type}]" })
            node_id += 1

        if tail not in nodes_dict:
            nodes_dict[tail] = node_id
            nodes.append({"id": node_id, "label": tail, "title": f"{tail}[{tail_type}]" })
            node_id += 1

        # Create edges based on the relations
        edges.append({"id":edge_id , "from": nodes_dict[head], "to": nodes_dict[tail]})
        edge_id += 1

    graph = {"nodes": nodes, "edges": edges}
    return graph


if __name__ == "__main__":
    with open('./sample.txt', 'r') as text_file:
        text = text_file.readline()
    graph = process_and_return_graph(text)
    print(graph)
