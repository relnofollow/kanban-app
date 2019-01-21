import React from 'react';

import Lane from './Lane';

export default ({lanes}) => (
    <div>
        {lanes.map((lane) => (
            <Lane className="lane" key={lane.id} lane={lane} />
        ))}
    </div>
)