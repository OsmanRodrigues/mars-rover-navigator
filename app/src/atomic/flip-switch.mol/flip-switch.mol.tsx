import { ThemeName } from "@atomic/theme.obj";
import { FliSwitchSyled } from "./flip-switch.mol.style";

interface FlipSwitch {
  theme: ThemeName;
  onClick: () => void;
}

export const FlipSwitch: React.FC<FlipSwitch> = props => {
  return (
    <FliSwitchSyled.Wrapper>
      <input
        type="checkbox"
        name="onoffswitch"
        className="onoffswitch-checkbox"
        id="myonoffswitch"
        tabIndex={0}
        onClick={props.onClick}
      />
      <label className="onoffswitch-label" htmlFor="myonoffswitch">
        <span className="onoffswitch-inner" />
        <span className="onoffswitch-switch" />
      </label>
    </FliSwitchSyled.Wrapper>
  );
};
