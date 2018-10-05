function reportProperty(from, to, propName) {
  if (from[propName]) {
    // eslint-disable-next-line no-param-reassign
    to[propName] = from[propName];
  }
}

/**
 * Make a higher order component by applying the given enhancers to the given base component.
 * The returned HOC has the same displayName, propTypes and defaultProps as the base component.
 * The base component will be accessible under the prop BaseComponent
 */
export default function enhanceComponent(enhancers, BaseComponent) {
  const EnhancedComponent = enhancers.reduce(
    (component, enhancer) => enhancer(component),
    BaseComponent,
  );

  reportProperty(BaseComponent, EnhancedComponent, 'displayName');
  reportProperty(BaseComponent, EnhancedComponent, 'propTypes');
  reportProperty(BaseComponent, EnhancedComponent, 'defaultProps');
  EnhancedComponent.BaseComponent = BaseComponent;

  return EnhancedComponent;
}
