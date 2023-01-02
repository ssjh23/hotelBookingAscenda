package org.FuzzedTest;

import java.io.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class PythonScriptTest {
    public ArrayList<String> searchBarFuzzed() throws IOException {
        ProcessBuilder processSearchBar = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\seans\\OneDrive\\Documents\\SUTD\\Term 5\\50.003\\ESC_Repo\\FuzzerGeneratorSearchbar.py"));
        processSearchBar.redirectErrorStream(true);
        Process process = processSearchBar.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            System.out.println(i);
        }
        return fuzzedInputs;
    }

    public ArrayList<String> datesStartFuzzed() throws IOException {
        ProcessBuilder processDatesStart = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\seans\\OneDrive\\Documents\\SUTD\\Term 5\\50.003\\ESC_Repo\\FuzzerGeneratorDatesStarting.py"));
        processDatesStart.redirectErrorStream(true);
        Process process = processDatesStart.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            System.out.println(i);
        }
        return fuzzedInputs;
    }

    public ArrayList<String> datesEndFuzzed() throws IOException {
        ProcessBuilder processDatesEnd = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\seans\\OneDrive\\Documents\\SUTD\\Term 5\\50.003\\ESC_Repo\\FuzzerGeneratorDatesEnd.py"));
        processDatesEnd.redirectErrorStream(true);
        Process process = processDatesEnd.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            System.out.println(i);
        }
        return fuzzedInputs;
    }
    private static ArrayList<String> readProcessOut(InputStream is) throws IOException {
        ArrayList<String> results = new ArrayList<>();
        InputStreamReader isr =new InputStreamReader(is, StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(isr);
        String line;
        while ((line = br.readLine()) != null)
        {
            results.add(line);
        }
        return results;
    }
    private static String resolvePythonScriptPath(String path){
        File file = new File(path);
        return file.getAbsolutePath();
    }
}
