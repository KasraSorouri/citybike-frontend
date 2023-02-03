
const UploadResults = ({ result }) => {
  if (!result) {
    return null
  }

  return (
    <div>
      <h3> total rercords: {result.totalRecords} </h3>
      <h3> records add to database: {result.addRecordeToDatabse} </h3>
      <h3 style={{ color: 'red' }}> invalid records: {result.inValidRecords}  </h3>
      <h4 style={{ color: 'red' }}> {result.shortTrip ? <>short trip: {result.shortTrip} </> : null } </h4>
      <h4 style={{ color: 'red' }}> {result.quickTrip ? <>quick trip: {result.quickTrip} </> : null } </h4>
      <h4 style={{ color: 'red' }}> {result.dublicatedRecord ? <>dublicated records: {result.dublicatedRecord} </> : null } </h4>
    </div>
  )
}

export default UploadResults