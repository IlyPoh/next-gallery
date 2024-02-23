export default function LoadingSpinner() {
  return (
    <div className={"loading-spinner"}>
      <div className={"lds-roller"}>
        {Array.from(Array(8).keys()).map((item) => (
          <div key={item}></div>
        ))}
      </div>
    </div>
  );
}
