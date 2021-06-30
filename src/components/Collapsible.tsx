import Collapse from "@kunukn/react-collapse";

export const MyComponent = () => (
  <Collapse isOpen={true}>
    <p>Paragraph of text.</p>
    <p>Another paragraph is also OK.</p>
    <p>Images and any other content are ok too.</p>
    <img src="cutecat.gif" />
  </Collapse>
);