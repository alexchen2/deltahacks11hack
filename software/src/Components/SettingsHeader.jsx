import "../vendor/css/settingsHeader.css";
import HeaderArrow from "../vendor/img/settings/left-chevron.png";

const SettingsHeader = ({ headerText, btnText }) => {
    return (
        <nav className="sheader-container">
            <div className="sheader-wrapper">
                {/* Back button aligned to left */}
                <a className="sheader-back">
                    <img src={HeaderArrow} alt="" />
                    <span className="">{ btnText }</span>
                </a>

                {/* Header */}
                <div>
                    <span className="sheader-text">{ headerText }</span>
                </div>
            </div>
        </nav>
    )
}

export default SettingsHeader;