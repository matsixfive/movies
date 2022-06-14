export default function RightCaret(props) {
  return (
    <>
      <svg
        className={props.className}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 13.9 24"
        style={{ enableBackground: "new 0 0 13.9 24" }}
      >
        <path
          style={{ fillrule: "evenodd", cliprule: "evenodd" }}
          className={props.colorClass}
          d="M3.3,0.6l10.1,10c0.7,0.8,0.7,2,0,2.7L3.3,23.5c-0.8,0.7-2,0.7-2.7,0c-0.7-0.8-0.7-2,0-2.7L9.4,12L0.7,3.3
    C0,2.5,0,1.3,0.7,0.6C1.4-0.2,2.6-0.2,3.3,0.6z"
        />
      </svg>
    </>
  );
}
