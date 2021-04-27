import React from 'react'
import Tree from '../Tree'

export default {
  component: Tree,
  title: 'React Tree',
};

const TreeWithProps = args => {
  console.log(args)
  return <Tree {...args} />
}

export const Default = TreeWithProps.bind({})
Default.args = {
  nodes: [
    {
      "id": 12345678,
      "parentId": null,
      "label": "My parent node",
      "items": [
        {
          "id": 87654321,
          "label": "My file",
          "parentId": 12345678
        }
      ]
    },
    {
      "id": 56789012,
      "parentId": 12345678,
      "label": "My child node",
      "items": null
    }
  ],
  onSelect: () => {}
}
