const Statistics = ({stats}) => {

  return (
    <table>
        <tbody>
            <tr>
                <td>All</td>
                <td>{stats.all}</td>
            </tr>
            <tr>
                <td>Average</td>
                <td>{stats.average}</td>
            </tr>
            <tr>
                <td>Positive</td>
                <td>{stats.positive}%</td>
            </tr>
        </tbody>
    </table>
  )
}

export default Statistics