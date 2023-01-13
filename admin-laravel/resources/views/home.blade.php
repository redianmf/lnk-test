<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Calculator Admin</title>

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <style>
            html {
                min-height: 100vh;
                width: 100vw;
                background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
                background-repeat: no-repeat;
            }

            #canvas {
                width: 50%;
            }

            .container-chart {
                box-sizing: content-box; 
                padding: 20px;
            }
                
        </style>
       
    </head>
    <body>
        <div class="container-all">
            <div class="container-chart">
                <canvas id="canvas" width="200" height="100"></canvas>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
        <script>
            let name = ['Example'];
            let duration = [1]
            
            name = <?php echo $user; ?>;
            duration = <?php echo $duration; ?>;
           
            let barChartData = {
                labels: name,
                datasets: [{
                    label: 'Duration (minutes)',
                    backgroundColor: "white",
                    data: duration
                }]
            };

            window.onload = function() {
                let ctx = document.getElementById("canvas").getContext("2d");
                window.myBar = new Chart(ctx, {
                    type: 'bar',
                    data: barChartData,
                    options: {
                        elements: {
                            rectangle: {
                                borderWidth: 2,
                                borderColor: '#fff',
                                borderSkipped: 'bottom'
                            }
                        },
                        legend: {
                            labels: {
                                fontColor: "#fff",
                                fontSize: 12
                            }
                        },
                        responsive: true,
                        title: {
                            display: true,
                            text: 'User Logged In Duration',
                            fontSize: 18,   
                            fontColor: '#fff'
                        },
                         scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "#fff",
                                    fontSize: 12,                                 
                                    beginAtZero: true,
                                    gridLines: {
                                        zeroLineColor: "#FFFFFF",
                                        color: "#fff"
                                    },
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "#fff",
                                    fontSize: 12,                               
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            };
        </script>
    </body>
</html>
