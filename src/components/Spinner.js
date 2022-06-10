import "./Spinner.css"

export default function Spinner() {
  return (
    <div className="spinnerContainer">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
