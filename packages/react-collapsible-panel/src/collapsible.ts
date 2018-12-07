import { Component, createElement as r } from 'react'

import { Context } from './context'

export interface CollapsibleProps {
  expanded?: boolean
  initialExpanded?: boolean
  onToggle?: (expanded: boolean) => void
}

export interface CollapsibleState {
  expanded: boolean
}

class Collapsible extends Component<CollapsibleProps, CollapsibleState> {
  constructor(props: CollapsibleProps) {
    super(props)
    this.state = {
      expanded: !!props.initialExpanded,
    }
  }
  public toggle = () => {
    const { props, state } = this
    const { onToggle } = props
    const isControlled = typeof props.expanded !== 'undefined'
    if (isControlled) {
      if (typeof onToggle === 'function') {
        onToggle(!!props.expanded)
      }
    } else {
      const expanded = !state.expanded
      this.setState(
        { expanded },
        () => typeof onToggle === 'function' && onToggle(expanded),
      )
    }
  }
  public render() {
    const { props, state } = this
    const { children } = props
    const isControlled = typeof props.expanded !== 'undefined'
    const expanded = Boolean(isControlled ? props.expanded : state.expanded)
    return r(
      Context.Provider,
      {
        value: {
          expanded,
          toggle: this.toggle,
        },
      },
      children,
    )
  }
}

export { Collapsible }
