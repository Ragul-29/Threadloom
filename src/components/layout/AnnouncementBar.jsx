import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./AnnouncementBar.css";

function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span>FREE SHIPPING ON ORDERS ABOVE ₹999</span>

        <Link to="/shop">
          SHOP COLLECTION
          <ArrowUpRight size={13} strokeWidth={1.5} />
        </Link>

        <span>EST. 2026 / THE ART OF EVERYDAY WEAR</span>
      </div>
    </div>
  );
}

export default AnnouncementBar;