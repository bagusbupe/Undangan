import BaseTemplate from './BaseTemplate';

// SimpleTemplate is a small wrapper to supply or adapt props for BaseTemplate.
export default function SimpleTemplate(props) {
  // props passed from App are forwarded; templates can also augment/override props here.
  return <BaseTemplate {...props} />;
}
