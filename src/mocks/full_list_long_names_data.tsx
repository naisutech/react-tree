import { nanoid as uid } from 'nanoid'
import type { NodeList } from '../Tree'

const rootNodes: NodeList = [
  {
    id: uid(),
    parentId: null,
    label: 'Root 1 - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: null
  },
  {
    id: uid(),
    parentId: null,
    label: 'Root 2 - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor ',
    items: null
  },
  {
    id: uid(),
    parentId: null,
    label: 'Root 3 - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: null
  }
]

const childNodes: NodeList = [
  {
    id: uid(),
    parentId: rootNodes[0].id,
    label: 'Child 1 - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: []
  },
  {
    id: uid(),
    parentId: rootNodes[1].id,
    label: 'Child 2 - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: null
  },
  {
    id: uid(),
    parentId: rootNodes[2].id,
    label: 'Child 3 - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: null
  }
]

const childChildNodes: NodeList = [
  {
    id: uid(),
    parentId: childNodes[0].id,
    label: 'Child Child 1  - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: null
  },
  {
    id: uid(),
    parentId: childNodes[1].id,
    label: 'Child Child 2  - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: []
  },
  {
    id: uid(),
    parentId: childNodes[2].id,
    label: 'Child Child 3  - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor',
    items: null
  }
]

for (let i = 0; i < 3; i++) {
  childNodes[0].items.push({
    id: uid(),
    parentId: childNodes[0].id,
    label: 'File ' + (i + 1) + ' - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor'
  })

  childChildNodes[1].items.push({
    id: uid(),
    parentId: childChildNodes[1].id,
    label: 'File ' + (i + 3) + ' - lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor, lorum ipsum dolor'
  })
}

export const nodes: NodeList = [...rootNodes, ...childNodes, ...childChildNodes]
