# Garmon

Garmon is a set of React components for building flexible yet accessible
collapsible sections and accordions. It is written in Typescript.

Garmon is also a type of Russian accordion.

## Usage

### Collapsible

The `Collapsible` component is a basic expanding and collapsing section. Wrap
it around the `Button` and `Body` components that together form the UI.

```jsx

import { Body, Button, Collapsible } from 'garmon'

export function Component() {
  return (
    <section>
      <Collapsible>
        <h2><Button>Section heading</Button></h2>
        <Body>
          This text is only visible when the section is expanded.
        </Body>
      </Collapsible>
    </section>
  )
}

```

Note that the markup inserted by the components is really minimal. This is by
design. Garmon is a bring your own markup and styling library, sacrificing some
convenience for extra flexibility.

`Collapsible` itself inserts no markup at all, leaving you free to wrap it in any element of you own choosing.

#### Collapsible props

+ `expanded`: `boolean` – using this prop makes the `Collapsible` be a
  *controlled* component, yielding any autonomy, letting you controll it fully
  like the puppet master you are (muhahahah)
+ `initialExpanded`: `boolean` – set this to `true` if you want the section to
  be expanded by default
+ `onToggle`: `(expanded: boolean) => void` – lets you add a callback function
  to be called whenever the user tries to toggle the expansion of the element.
  In case of a controlled component, you will have to toggle the `expanded` prop
  yourself.

#### Button

`Button` creates a normal HTML `button` element, with no styling. Here it is
wrapped inside a heading element, but it will still look like a button. You can
style it however you want – be it with a CSS-in-JS library, CSS modules, a
hand-written `className` prop, or even (gasp) inline styles.

#### Body

`Body` inserts a `div` element, but you can even get rid of that by using
`CollapsibleContext.Consumer` to create your own custom body component, should
you wish to.

### Accordion

`Accordion` wraps a group of `AccordionItem` components, which is a specialized
type of `Collapsible` where only one item in a group can be expanded at a time.

```jsx

import { Accordion, AccordionItem, Body, Button } from 'garmon'

export function Component() {
  return (
    <div>
      <Accordion>
        <section>
          <AccordionItem>
            <h2><Button>Section heading</Button></h2>
            <Body>
              Only one of these sections can be open at a time.
            </Body>
          </AccordionItem>
        </section>
        <section>
          <AccordionItem>
            <h2><Button>Section heading</Button></h2>
            <Body>
              If you can read this, then you can't read the previous body text.
            </Body>
          </AccordionItem>
        </section>
      </Accordion>
    </div>
  )
}

```

Again, neither `Accordion` nor `AccordionItem` insert any HTML markup.

#### Accordion props

+ `expandedIndex`: `number` – using `Accordion` as a controlled component,
  provide the index of the `AccordionItem` that you want to be expanded
+ `initialExpandedIndex`: `number` – like `expandedIndex`, but providing an
  initial value for an uncontrolled component
+ `onToggle`: `(expandedIndex: number) => void` – callback prop where the
  argument provided to the function is either the index that just were expanded
  (in case of an uncontrolled component), or the index that the `Accordion`
  would like to show, were you not such a control freak

## Examples

[Some more examples on CodeSandbox](https://codesandbox.io/s/10kny0qm3q)

## Legal

Copyright © 2018 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
