import { Component, createElement as r } from 'react'

import { Context } from './context'

export interface PanelProps {
  expanded?: boolean
  initialExpanded?: boolean
}

export interface PanelState {
  expanded: boolean
}

class Panel extends Component<PanelProps, PanelState> {
  constructor(props: PanelProps) {
    super(props)
    this.state = {
      expanded: !!props.initialExpanded,
    }
  }
  public toggle() {
    const expanded = !this.state.expanded
    this.setState({ expanded })
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
          toggle: isControlled ? () => undefined : () => this.toggle(),
        },
      },
      children,
    )
  }
}

export { Panel }
