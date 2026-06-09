import BaseTemplate from './BaseTemplate';

export default function SimpleTemplate({ data, shared, ...props }) {
  return <BaseTemplate data={data} shared={shared} {...props} />;
}
