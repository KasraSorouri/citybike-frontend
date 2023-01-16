
const UploadResults = ({ result }) => {
  console.log('*** results ** ->', result)

  if (!result) {
    return null
  }

  return (
    <div>
      <p> total rercords: {result.totalRecords} &nbsp; &nbsp;- &nbsp; &nbsp; {result.addRecordeToDatabse} of records is add to database &nbsp; &nbsp; &nbsp; &nbsp; invalid records: {result.inValidRecords} </p>
      <p>{result.shortTrip ? <>short trip: {result.shortTrip} &nbsp; &nbsp; &nbsp;</> : null }
        {result.quickTrip ? <>quick trip: {result.quickTrip} &nbsp; &nbsp; &nbsp;</> : null }
        {result.dublicatedRecord ? <>dublicated records: {result.dublicatedRecord} </> : null } </p>
    </div>
  )
}

export default UploadResults