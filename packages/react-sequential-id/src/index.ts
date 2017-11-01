import uniqueid from 'uniqueid'

export interface ISequentialIdProps {
  children: (id: string) => React.ReactElement<any> | null
}

type SequentialId = React.SFC<ISequentialIdProps>

export function withIdFactory(factory: Function): SequentialId {
  return function SequentialId({ children }: ISequentialIdProps) {
    return children(factory())
  }
}

export default withIdFactory(uniqueid('i'))
