import { h, Component, cloneElement } from 'preact'

export class Tabs extends Component {
  render (props) {
    this._parseChildren(props)
    return (
      <div {...props} />
    )
  }
  _parseChildren (props) {
    const labels = []
    const contents = []
    props.children.forEach(c => {
      if (isTab(c)) {
        console.log(c.children[0].children)
      }
    })
  }
  _handleClick (idx) {
    if (this.props.onChange) this.props.onChange(idx)
  }
}
export class Tab extends Component {
  render (props) {
    const {
      activeClassName,
      children, label, ...other
    } = props
    const cls = stripActiveClass(props.class, activeClassName) || []
    return (
      <section
        class={cls.join(' ')}
        role='tab'
        tabIndex='0'
        {...other}
      >
        <span onClick={this._handleClick}>{label}</span>
        {children}
      </section>
    )
  }
  _handleClick (e) {
    if (this.props.onClick) this.props.onClick(e, this.props.index)
  }
}
function isTab (n) {
  return !!(n && n.nodeName.name === 'Tab')
}
function stripActiveClass (cls, activeCls) {
  if (!cls) return

  let clsarr = cls.split(' ')
  const i = clsarr.indexOf(activeCls)
  if (i > -1) clsarr.splice(i, 1)

  return clsarr
}
