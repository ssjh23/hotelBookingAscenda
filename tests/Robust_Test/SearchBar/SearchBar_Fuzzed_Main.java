package org.FuzzedTest.SearchBar;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;

import java.io.IOException;
import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

public class SearchBar_Fuzzed_Main {
    public static void main(ChromeDriver driver, Wait<WebDriver> Fwait) throws InterruptedException, IOException {

        PythonScriptTest fuzzGenerator = new PythonScriptTest();
        ArrayList<String> searchBarFuzzedInputs = fuzzGenerator.searchBarFuzzed();
        ArrayList<String> dateStartingFuzzedInputs = fuzzGenerator.datesStartFuzzed();
        ArrayList<String> datesEndFuzzedInputs = fuzzGenerator.datesEndFuzzed();

        for (int index = 0; index < 100; index++) {
            Thread.sleep(2000);

            WebElement startDate = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div/div/div/div/div[2]/div/div[1]/div[1]/div/input")));
            startDate.click();
            startDate.sendKeys(Keys.CONTROL+ "a");
            startDate.sendKeys(Keys.DELETE);
            startDate.sendKeys(dateStartingFuzzedInputs.get(index));

            WebElement endDate = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div/div/div/div/div[2]/div/div[2]/div[1]/div/input")));
            endDate.click();
            endDate.sendKeys(Keys.CONTROL+ "a");
            endDate.sendKeys(Keys.DELETE);
            endDate.sendKeys(datesEndFuzzedInputs.get(index));

            WebElement searchBar = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.id("searchbar")));
            searchBar.sendKeys(searchBarFuzzedInputs.get(index));

            WebElement submit = driver.findElement(By.className("submit-button"));
            submit.click();

            System.out.println(searchBarFuzzedInputs.get(index));
            System.out.println(datesEndFuzzedInputs.get(index));
            System.out.println(dateStartingFuzzedInputs.get(index));

            WebElement errorSearchName = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.className("searchbar_error")));
            WebElement errorSearchDate = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.className("date_error")));
            if (!errorSearchName.getText().isEmpty() || !errorSearchDate.getText().isEmpty()){
                if(!errorSearchName.getText().isEmpty()){
                    assertEquals("Please select a location from the list", errorSearchName.getText());
                    Thread.sleep(500);
                    searchBar.sendKeys(Keys.CONTROL + "a");
                    searchBar.sendKeys(Keys.DELETE);
                }
                if(!errorSearchDate.getText().isEmpty()){
                    assertEquals("Please select an appropriate date range", errorSearchDate.getText());
                    Thread.sleep(500);

                }

            }
            else{
                Thread.sleep(3000);
                WebElement ListOfHotels = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.id("containerHeader")));
                System.out.println(ListOfHotels.getText());

                if (ListOfHotels.getText().equals("List of Hotels")) {
                    System.out.println(true);
                    WebElement logo = driver.findElement(By.id("logo"));
                    Thread.sleep(500);
                    logo.click();
                }
            }


        }
    }
}

