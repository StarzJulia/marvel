import React, {useState} from 'react';

interface SortInterface {
    orderBy: (params: {}) => void
}

export default function Sort({orderBy}: SortInterface) {
	const options = ['Name', 'Modified'];
    const [chosen, setChosenOption] = useState<string[][]>([]);
    const values = ['', '', '-'];

    const optionClick = (i: number) => {
        let option = options[i].toLocaleLowerCase();
        let newChosen: string[][] = chosen;
        let opt = 1;
        let isChosen = newChosen.find(el => el[0] == option);

        if (isChosen) {
            newChosen = newChosen.filter(el => el[0] != option);
            opt = (parseInt(isChosen[1]) + 1) % 3;
        }

        if (opt > 0) {
            newChosen.unshift([option, String(opt)]);
        }

        setChosenOption(newChosen);

        orderBy({
            'orderBy': newChosen.reduce((res, el) => {
                res.push(values[parseInt(el[1])] + el[0]);
                return res;
            }, []).join(','),
            'offset': 0
        });
    }

    return (
        <div className="filter_sort">
            <div className="filter_sort-select-header">
                Sort by
            </div>
            <div className="filter_sort-select">
                {options.map((o, i) => {
                    let order = '0';
                    let className = "filter_sort-select_item";
                    const isChosen = chosen.find((c) => {
                        const [cName, cOrder] = c;
                        if (cName == o.toLocaleLowerCase()) {
                            order = cOrder;
                            return true;
                        }
                        return false;
                    });
                    className += isChosen ? " chosen" : "";
                    className += order == '1' ? ' asc' : (order == '2' ? ' desc' : '');
                    
                    return <div 
                        key={i} 
                        className={className}
                        onClick={() => optionClick(i)}
                    >
                        {o}
                    </div>
                })}
            </div>
        </div>
    )
}