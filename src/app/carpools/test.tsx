export const carpools: any =
{
    "female_carpools": {
        "type": "FeatureCollection",
        "properties": {
            "mode": "drive",
            "params": {
                "mode": "drive",
                "agents": [
                    {
                        "start_location": [
                            -79.6348543,
                            43.5576915
                        ],
                        "end_location": [
                            -79.6645851,
                            43.54815079999999
                        ],
                        "time_windows": [
                            [
                                0,
                                7200
                            ]
                        ],
                        "pickup_capacity": 2
                    }
                ],
                "jobs": [
                    {
                        "location": [
                            -79.6400354,
                            43.55777450000001
                        ],
                        "duration": 60,
                        "pickup_amount": 1
                    },
                    {
                        "location": [
                            -79.63996,
                            43.55871
                        ],
                        "duration": 60,
                        "pickup_amount": 1
                    },
                    {
                        "location": [
                            -79.6404515,
                            43.5572923
                        ],
                        "duration": 60,
                        "pickup_amount": 1
                    }
                ]
            },
            "issues": {
                "unassigned_jobs": [
                    1
                ]
            }
        },
        "features": [
            {
                "geometry": {
                    "type": "MultiLineString",
                    "coordinates": [
                        [
                            [
                                -79.634854,
                                43.557691
                            ],
                            [
                                -79.640035,
                                43.557775
                            ]
                        ],
                        [
                            [
                                -79.640035,
                                43.557775
                            ],
                            [
                                -79.640451,
                                43.557292
                            ]
                        ],
                        [
                            [
                                -79.640451,
                                43.557292
                            ],
                            [
                                -79.664585,
                                43.548151
                            ]
                        ]
                    ]
                },
                "type": "Feature",
                "properties": {
                    "agent_index": 0,
                    "time": 514,
                    "start_time": 0,
                    "end_time": 514,
                    "distance": 4933,
                    "legs": [
                        {
                            "time": 91,
                            "distance": 914,
                            "from_waypoint_index": 0,
                            "to_waypoint_index": 1,
                            "steps": [
                                {
                                    "from_index": 0,
                                    "to_index": 1,
                                    "time": 91,
                                    "distance": 914
                                }
                            ]
                        },
                        {
                            "time": 13,
                            "distance": 76,
                            "from_waypoint_index": 1,
                            "to_waypoint_index": 2,
                            "steps": [
                                {
                                    "from_index": 0,
                                    "to_index": 1,
                                    "time": 13,
                                    "distance": 76
                                }
                            ]
                        },
                        {
                            "time": 290,
                            "distance": 3943,
                            "from_waypoint_index": 2,
                            "to_waypoint_index": 3,
                            "steps": [
                                {
                                    "from_index": 0,
                                    "to_index": 1,
                                    "time": 290,
                                    "distance": 3943
                                }
                            ]
                        }
                    ],
                    "mode": "drive",
                    "actions": [
                        {
                            "index": 0,
                            "type": "start",
                            "start_time": 0,
                            "duration": 0,
                            "waypoint_index": 0
                        },
                        {
                            "index": 1,
                            "type": "job",
                            "start_time": 91,
                            "duration": 60,
                            "job_index": 0,
                            "waypoint_index": 1
                        },
                        {
                            "index": 2,
                            "type": "job",
                            "start_time": 164,
                            "duration": 60,
                            "job_index": 2,
                            "waypoint_index": 2
                        },
                        {
                            "index": 3,
                            "type": "end",
                            "start_time": 514,
                            "duration": 0,
                            "waypoint_index": 3
                        }
                    ],
                    "waypoints": [
                        {
                            "original_location": [
                                -79.6348543,
                                43.5576915
                            ],
                            "location": [
                                -79.634854,
                                43.557691
                            ],
                            "start_time": 0,
                            "duration": 0,
                            "actions": [
                                {
                                    "index": 0,
                                    "type": "start",
                                    "start_time": 0,
                                    "duration": 0,
                                    "waypoint_index": 0
                                }
                            ],
                            "next_leg_index": 0
                        },
                        {
                            "original_location": [
                                -79.6400354,
                                43.55777450000001
                            ],
                            "location": [
                                -79.640035,
                                43.557775
                            ],
                            "start_time": 91,
                            "duration": 60,
                            "actions": [
                                {
                                    "index": 1,
                                    "type": "job",
                                    "start_time": 91,
                                    "duration": 60,
                                    "job_index": 0,
                                    "waypoint_index": 1
                                }
                            ],
                            "prev_leg_index": 0,
                            "next_leg_index": 1
                        },
                        {
                            "original_location": [
                                -79.6404515,
                                43.5572923
                            ],
                            "location": [
                                -79.640451,
                                43.557292
                            ],
                            "start_time": 164,
                            "duration": 60,
                            "actions": [
                                {
                                    "index": 2,
                                    "type": "job",
                                    "start_time": 164,
                                    "duration": 60,
                                    "job_index": 2,
                                    "waypoint_index": 2
                                }
                            ],
                            "prev_leg_index": 1,
                            "next_leg_index": 2
                        },
                        {
                            "original_location": [
                                -79.6645851,
                                43.54815079999999
                            ],
                            "location": [
                                -79.664585,
                                43.548151
                            ],
                            "start_time": 514,
                            "duration": 0,
                            "actions": [
                                {
                                    "index": 3,
                                    "type": "end",
                                    "start_time": 514,
                                    "duration": 0,
                                    "waypoint_index": 3
                                }
                            ],
                            "prev_leg_index": 2
                        }
                    ]
                }
            }
        ]
    }
}