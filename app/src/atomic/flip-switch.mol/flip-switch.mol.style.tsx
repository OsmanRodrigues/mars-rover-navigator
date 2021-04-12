import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 90px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  .onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #999999;
    border-radius: 20px;
  }
  .onoffswitch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .onoffswitch-inner:before,
  .onoffswitch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 30px;
    padding: 0;
    line-height: 30px;
    font-size: 14px;
    color: white;
    font-family: Trebuchet, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
  }
  .onoffswitch-inner:before {
    content: "Dark";
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    padding-left: 10px;
  }
  .onoffswitch-inner:after {
    content: "Light";
    padding-right: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    text-align: right;
  }
  .onoffswitch-switch {
    display: block;
    width: 18px;
    margin: 6px;
    background: #ffffff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 56px;
    border: 2px solid #999999;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px;
  }
`;

export const FliSwitchSyled = {
  Wrapper
};
