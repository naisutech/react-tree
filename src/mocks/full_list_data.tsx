import { nanoid } from 'nanoid'
import type { NodeList } from '../Tree'

const rootNodes: NodeList = [
  {
    id: nanoid(),
    parentId: null,
    label: 'Root 1'
  },
  {
    id: nanoid(),
    parentId: null,
    label: 'Root 2'
  },
  {
    id: nanoid(),
    parentId: null,
    label: 'Root 3'
  }
]

const childNodes: NodeList = [
  {
    id: nanoid(),
    parentId: rootNodes[0].id,
    label: 'Child 1',
    items: []
  },
  {
    id: nanoid(),
    parentId: rootNodes[1].id,
    label: 'Child 2'
  },
  {
    id: nanoid(),
    parentId: rootNodes[1].id,
    label: 'Child 3'
  },
  {
    id: nanoid(),
    parentId: rootNodes[2].id,
    label: 'Child 4'
  }
]

const childChildNodes: NodeList = [
  {
    id: nanoid(),
    parentId: childNodes[0].id,
    label: 'Child Child 1'
  },
  {
    id: nanoid(),
    parentId: childNodes[1].id,
    label: 'Child Child 2',
    items: []
  },
  {
    id: nanoid(),
    parentId: childNodes[2].id,
    label: 'Child Child 3'
  }
]

for (let i = 0; i < 3; i++) {
  if (childNodes[0].items) {
    childNodes[0].items.push({
      id: nanoid(),
      parentId: childNodes[0].id,
      label: 'File ' + (i + 1)
    })
  }

  if (childChildNodes[1].items) {
    childChildNodes[1].items.push({
      id: nanoid(),
      parentId: childChildNodes[1].id,
      label: 'File ' + (i + 3)
    })
  }
}

export const nodes: NodeList = [...rootNodes, ...childNodes, ...childChildNodes]
