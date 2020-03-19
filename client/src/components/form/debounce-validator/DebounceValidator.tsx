import * as React from 'react';

interface IDebounceValidatorProps {
  debounce: number;
  validate: (...opts: any) => Promise<any>;
  component: React.FunctionComponent<any>;
  [key: string]: any;
}

class DebounceValidator extends React.Component<IDebounceValidatorProps, any> {
  protected resetTimeout: any;

  constructor(props: IDebounceValidatorProps) {
    super(props);

    this.validate = this.validate.bind(this);
  }

  public validate(...args: any) {
    if (this.resetTimeout !== undefined) {
      this.resetTimeout();
    }
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        this.props.validate(...args)
          .then((res) => resolve(res));
      }, this.props.debounce);
      this.resetTimeout = () => {
        clearTimeout(timeout);
        resolve();
      };
    });
  }

  public render() {
    return <this.props.component {...this.props} validate={this.validate} />;
  }
}

export default DebounceValidator;
