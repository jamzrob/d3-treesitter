class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


node1 = Node(12)
node2 = Node(99)
node1.next = node2
