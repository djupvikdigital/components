import { Component, createElement as r } from 'react'

import { Context } from './context'

export interface PanelProps {
  initialExpanded: boolean
}

export interface PanelState {
  expanded: boolean
}

class Panel extends Component<PanelProps, PanelState> {
  constructor(props: PanelProps) {
    super(props)
    this.state = {
      expanded: props.initialExpanded,
    }
  }
  public toggle() {
    const expanded = !this.state.expanded
    this.setState({ expanded })
  }
  public render() {
    const { children } = this.props
    const { expanded } = this.state
    return r(
      Context.Provider,
      {
        value: {
          expanded,
          toggle: () => this.toggle(),
        },
      },
      children,
    )
  }
}

export { Panel }
