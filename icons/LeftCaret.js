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
          d="M13.3,0.6c0.7,0.7,0.7,1.9,0,2.7L4.6,12l8.8,8.8c0.7,0.7,0.7,1.9,0,2.7c-0.7,0.7-1.9,0.7-2.7,0L0.6,13.3
	c-0.7-0.7-0.7-1.9,0-2.7L10.7,0.6C11.4-0.2,12.6-0.2,13.3,0.6z"
        />
      </svg>
    </>
  );
}
