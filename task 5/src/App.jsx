import { useState } from "react";
import Header from "./components/Header";
import SearchCard from "./components/SearchCard";
import InfoCard from "./components/InfoCard";
import Footer from "./components/Footer";
import { parseEgyptianNationalId } from "./utils/idParser";

function App() {
  const [nationalIdData, setNationalIdData] = useState({
    birthDate: "",
    birthPlace: "",
    gender: ""
  });

  const [error, setError] = useState("");

  const handleSearch = (idNumber) => {
    setError("");
    
    if (!idNumber.trim()) {
      setNationalIdData({
        birthDate: "",
        birthPlace: "",
        gender: ""
      });
      return;
    }

    const result = parseEgyptianNationalId(idNumber);
    
    if (result) {
      setNationalIdData(result);
    } else {
      setError("رقم قومي غير صحيح. تأكد من إدخال 14 أو 16 رقمًا صالحًا.");
      setNationalIdData({
        birthDate: "",
        birthPlace: "",
        gender: ""
      });
    }
  };

  const handleManualSave = (field, value) => {
    setNationalIdData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <h2 className="title">ممكن تعرف!</h2>
          <p className="subtitle">من أي رقم قومي مصري هتقدر تعرف شوية تفاصيل بسيطة</p>
          
          <SearchCard onSearch={handleSearch} />
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="info-cards-grid">
            <InfoCard 
              icon="📅" 
              label="تاريخ الميلاد" 
              value={nationalIdData.birthDate || "---"}
              editable={true}
              onSave={(v) => handleManualSave('birthDate', v)}
            />
            <InfoCard 
              icon="📍" 
              label="محل الإقامة" 
              value={nationalIdData.birthPlace || "---"}
              editable={true}
              onSave={(v) => handleManualSave('birthPlace', v)}
            />
            <InfoCard 
              icon="👤" 
              label="النوع" 
              value={nationalIdData.gender || "---"}
              editable={true}
              onSave={(v) => handleManualSave('gender', v)}
            />

            <div className="about-card">
              <p className="about-text">قدرنا نعرف الآخري</p>
            </div>
          </div>

          {/* parsed info container removed per user request */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
