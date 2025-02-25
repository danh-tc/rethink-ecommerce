import './_button.scss'
// eslint-disable-next-line react/prop-types
export default function Button({label, ...props}) {
  return <button className='app__button' {...props}>{label}</button>;
}
