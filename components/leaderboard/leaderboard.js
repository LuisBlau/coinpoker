import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import LeaderboardTable from "../leaderboard/table";
import { leaderBoardService } from '../../services';

export default function LeaderBoard({ when, title, color, tableClassName }) {

    const [leaderboard, setLeaderboard] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await leaderBoardService.getLeaderBoards(when);
                let res = data?.results;
                if (when === 'lastweek' || when === 'lastmonth') {
                    res = _.filter(data?.results, function (o) { return o.prize > 0; });
                }
                setLoading(false);
                setLeaderboard(res);
            } catch (e) {
                console.log("error fetching data leaderboard last month " + e);
            }
        }

        fetchData();
    }, [when]);

    return (
        <div>
            <div>

                <LeaderboardTable tableClassName={tableClassName} type={when} data={leaderboard} title={title} color={color ? color : ''} loading={loading} />
            </div>
        </div>
    );
}