import 'package:flutter/material.dart';
import 'dart:convert';

import 'package:flutter/services.dart';
import 'Types.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: HomaPage(),
    );
  }
}

class HomaPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _HomaPageState();
  }
}

class _HomaPageState extends State<HomaPage> {
  Forecast? _forecast = null;

  Future<void> readJson() async {
    final String response = await rootBundle.loadString('assets/data.json');
    final data = await json.decode(response);

    setState(() {
      _forecast = Forecast.fromJson(data);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Test weather app',
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(25),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(5),
              child: ElevatedButton(
                onPressed: readJson,
                child: const Text('Fetch'),
              ),
            ),

            // Display the data loaded from sample.json
            _forecast != null
                ? Expanded(
                    child: ListView.builder(
                      itemCount: _forecast?.list?.length,
                      itemBuilder: (context, index) {
                        final item = _forecast?.list?[index];
                        final date = DateTime.fromMillisecondsSinceEpoch((item?.dt ?? 0 ) * 1000);

                        return Card(
                          key: ValueKey(index),
                          margin: const EdgeInsets.all(5),
                          color: Colors.blue.shade600,
                          
                          child: ListTile(
                            title: Text('${date.month}/${date.day}/${date.year} ${date.hour}:00', 
                              style: TextStyle(
                                fontSize: 16,
                                foreground: Paint()
                                  ..color = Colors.white,
                                ),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Image.network('https://openweathermap.org/img/wn/${item?.weather?[0].icon}@4x.png',
                                      width: 64,
                                      height: 64,
                                    ),
                                    Text(item?.weather?[0].description ?? 'baboon', 
                                      style: TextStyle(
                                        fontSize: 16,
                                        foreground: Paint()
                                          ..color = Colors.white,
                                        ),
                                    ),
                                  ]
                                ),
                                Text('Temp: ${item?.main?.tempMin}F / ${item?.main?.tempMax}', 
                                  style: TextStyle(
                                    fontSize: 13,
                                    foreground: Paint()
                                      ..color = Colors.white,
                                    ),
                                ),
                                Text('Numidity: ${item?.main?.humidity}%', 
                                  style: TextStyle(
                                    fontSize: 13,
                                    foreground: Paint()
                                      ..color = Colors.white,
                                    ),
                                ),
                              ]
                            )
                          ),
                        );
                      },
                    ),
                  )
                : Container()
          ],
        ),
      ),
    );
  }
}

class DayShortInfo extends StatefulWidget {
  final WeatherRecord? weatherRecord;

  const DayShortInfo({super.key, required this.weatherRecord});

  @override
  State<StatefulWidget> createState() {
    return _DayShortInfoState();
  }
}

class _DayShortInfoState extends State<DayShortInfo> {
  @override
  Widget build(BuildContext context) {
    return const Text('dasda');
  }
}
