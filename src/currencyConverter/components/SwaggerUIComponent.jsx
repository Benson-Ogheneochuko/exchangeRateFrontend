import SwaggerUI from "swagger-ui-react";
import swaggerSpec from "../swaggerSpec.json";
import "swagger-ui-react/swagger-ui.css";
import "./SwaggerUIComponent.css";

const SwaggerUIComponent = () => {
  return (
    <div className="swagger-ui-container">
      <SwaggerUI spec={swaggerSpec} />
    </div>
  );
};

export default SwaggerUIComponent;
