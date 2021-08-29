import React from 'react';
import {LinearProgress} from "@material-ui/core";

const Loader = () => {
    return (
        <div class="outer">
            <div class="middle">
                <div class="inner">
                    <LinearProgress />
                </div>
            </div>
        </div>
    );
};

export default Loader;