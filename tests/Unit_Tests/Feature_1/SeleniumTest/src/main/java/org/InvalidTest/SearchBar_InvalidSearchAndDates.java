package org.InvalidTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.Assert.assertEquals;

public class SearchSubmit_InvalidSearchBar_InvalidDateRange_OneRoom_OneGuest_ClickOnBackgroundForSearchComponentToComponentForDates_InvalidSearch {
    public static void main(String[] args) throws InterruptedException {
        // Path for Chrome Driver
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\seans\\Downloads\\chromedriver_win32\\chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();

        driver.get("http:localhost:3000/");

        // Type into Searchbar
        WebElement searchBar = driver.findElement(By.id("searchbar"));
        searchBar.sendKeys("This is not a valid Input");

        // Click on empty whitespace to deselect searchbar
        WebElement background = driver.findElement(By.className("flexbox-sub-main"));
        background.click();

        // Click on Start Datepicker
        WebElement startDateList = driver.findElement(By.id("startdate"));
        startDateList.click();
        Thread.sleep(2000);

        // Select date on Start Datepicker
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        WebElement startDate = driver.findElement(By.cssSelector("div[aria-label='Choose Tuesday, July 26th, 2022']"));
        startDate.click();

        // Click on End Datepicker
        WebElement endDateList = driver.findElement(By.id("enddate"));
        endDateList.click();
        Thread.sleep(2000);
        // Click on date on End Datepicker
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        WebElement endDate = driver.findElement(By.cssSelector("div[aria-label='Choose Friday, July 29th, 2022']"));
        endDate.click();

        // Click on Start Datepicker
        startDateList.click();
        Thread.sleep(2000);
        // Reselect to a date on Start Datepicker that is later than end date
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        WebElement wrongStartDate = driver.findElement(By.cssSelector("div[aria-label='Choose Sunday, July 31st, 2022']"));
        wrongStartDate.click();
        Thread.sleep(2000);

        // Click Submit button
        WebElement submit = driver.findElement(By.id("submit"));
        submit.click();

        // Wait for error search to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement errorSearch = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("searchbar_error")));
        WebElement errorDate = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("date_error")));


        assertEquals("Please select a location from the list", errorSearch.getText());
        assertEquals("Please select an appropriate date range", errorDate.getText());


    }
}
