import React, { PropTypes, Component } from 'react';
import { shapes } from 'ducks/components/multiple';
import { shallowEqual } from 'tools';

const SelectButton = ({ isActive, setSelectedAction }) => (
  <button onClick={setSelectedAction}>
    { isActive ? 'Active' : 'Inactive' }
  </button>
);

SelectButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setSelectedAction: PropTypes.func.isRequired,
};

class Multiple extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    multipleComponentIm: shapes.state.isRequired,
    multipleComponentSetSelectedDelta: PropTypes.func.isRequired,
    multipleComponentRegisterDelta: PropTypes.func.isRequired,
    multipleComponentUnregisterDelta: PropTypes.func.isRequired,
  };

  // регистрируем множественный умный компонент
  componentWillMount() {
    this.props.multipleComponentRegisterDelta({
      componentId: this.props.componentId,
    });
  }

  // не перерендериваемся при изменении данных в других компонентов
  shouldComponentUpdate(nextProps) {
    const { multipleComponentIm, ...restProps } = this.props;
    const { multipleComponentIm: nextMultipleComponentIm, ...restNextProps } = nextProps;
    const componentId = this.props.componentId;

    // проверяем все props, кроме multipleComponentIm
    if (!shallowEqual(restProps, restNextProps)) {
      return true;
    }

    // проверяем multipleComponentIm для данного компонента
    return multipleComponentIm.get(componentId) !== nextMultipleComponentIm.get(componentId);
  }

  // разрегистрируем множественный умный компонент
  componentWillUnmount() {
    this.props.multipleComponentUnregisterDelta({
      componentId: this.props.componentId,
    });
  }

  render() {
    const {
      componentId,
      multipleComponentIm,
      multipleComponentSetSelectedDelta,
    } = this.props;

    // получаем данные для данного компонента
    const currentComponentDataIm = multipleComponentIm.get(componentId);

    if (currentComponentDataIm === undefined) {
      return null;
    }

    const selectedIndex = currentComponentDataIm.get('selectedIndex');

    return (
      <div>
        <span>Multiple smart component</span>
        <div>
          {[0, 1, 2].map(index => (
            <SelectButton
              key={index}
              isActive={index === selectedIndex}
              setSelectedAction={() => multipleComponentSetSelectedDelta({
                componentId,
                selectedIndex: index,
              })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Multiple;
