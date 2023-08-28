import Document from "../components/common/document/Document";
import Map from "../components/common/layout/Map";
import MainLayout from "../components/common/layout/MainLayout";
import { useLocation } from "react-router-dom";

const DocumentPage = () => {
  const location = useLocation();
  const receivedData = location.state;

  return (
    <>
      <MainLayout viewActive={true}>
        <Document id={receivedData?.docsId} />
        <Map
          apiLat={receivedData?.docsLocation.lat}
          apiLng={receivedData?.docsLocation.lng}
        />
      </MainLayout>
    </>
  );
};

export default DocumentPage;
