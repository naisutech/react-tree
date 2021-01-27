import uid from 'nanoid'

const rootNodes = [
  {
    id: uid(),
    parentId: null,
    label: 'One completely expanded node',
    items: null,
    expanded: true
  },
  {
    id: uid(),
    parentId: null,
    label: 'No expanding',
    items: null,
    expanded: false
  }
]

const childNodes = [
  {
    id: uid(),
    parentId: rootNodes[1].id,
    label: 'no expansion',
    items: []
  },
  {
    id: uid(),
    parentId: rootNodes[0].id,
    label: 'Baby of completely expanded node',
    items: null,
    expanded: true
  }
]


export const nodes = [...rootNodes, ...childNodes]
