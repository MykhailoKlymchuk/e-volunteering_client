import {parseISO} from "date-fns"
import React, {useState, useEffect} from "react"
import DateSlider from "../common/DateSlider"
import VolunteerInitiativeFilter from "../common/volunteer_initiative/VolunteerInitiativeFilter.jsx";
import moment from "moment"


const VolunteerInitiativesTable = ({viInfo, handleVICancellation}) => {
    const [filteredVIs, setFilteredVIs] = useState(viInfo)

    const filterVIs = (startDate, endDate) => {
        let filtered = viInfo
        if (startDate && endDate) {
            filtered = viInfo.filter((vi) => {
                const viStarDate = parseISO(vi.publicationDate)
                const viEndDate = parseISO(vi.publicationDate)
                return (viStarDate >= startDate && viEndDate <= endDate && viEndDate > startDate)
            })
        }
        setFilteredVIs(filtered)
    }

    useEffect(() => {
        setFilteredVIs(viInfo)
    }, [viInfo])

    return (<section className="p-4">
        <VolunteerInitiativeFilter data={filteredVIs}
                                   setFilteredData={setFilteredVIs}/>
        <DateSlider onDateChange={filterVIs} onFilterChange={filterVIs}/>
        <table className="table table-bordered table-hover shadow">
            <thead>
            <tr>
                <th>S/N</th>
                <th>Залоговок</th>
                <th>Тип</th>
                <th>Необхідна сума</th>
                <th>Коефіцієнт</th>
                <th>Посилання на статистику</th>
                <th>Посилання на банку</th>
                <th>Дата публікації</th>
                <th>Крайній термін</th>
                <th>Статус</th>
                <th></th>
            </tr>
            </thead>
            <tbody className="text-center">
            {filteredVIs.map((vi) => (<tr key={vi.id}>
                <td>{vi.id}</td>
                <td>{vi.name}</td>
                <td>{vi.volunteerInitiativeType}</td>
                <td>{vi.requiredAmount}</td>
                <td>{vi.coeffOfNecessity}</td>
                <td><a href={vi.jarUrlStats}>link </a></td>
                <td><a href={vi.jarUrl}>link </a></td>
                <td>{moment(vi.publicationDate).subtract(1, "month").format("MMM Do, YYYY")}                   </td>
                <td>{moment(vi.deadlineDate).subtract(1, "month").format("MMM Do, YYYY")}                   </td>
                <td>{!vi.closed ? `відкрито` : 'закрито'}
                </td>
                <td>
                    {vi.сlosed ? (
                        <button className="btn btn-secondary btn-sm" disabled>
                            Збір закрито
                        </button>
                    ) : (
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleVICancellation(vi.id)}>
                            Закрити збір
                        </button>
                    )}
                </td>


            </tr>))}
            </tbody>
        </table>
        {filterVIs.length === 0 && <p> На вибрані дати не знайдено жодного ініціативи</p>}
    </section>)
}

export default VolunteerInitiativesTable