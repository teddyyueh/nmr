package javascript

import grails.test.mixin.*

import org.junit.runner.RunWith

import de.is24.util.karmatestrunner.junit.KarmaTestSuiteRunner
 
@RunWith(KarmaTestSuiteRunner)
@KarmaTestSuiteRunner.KarmaConfigPath("./test/unit/javascript/lib/karma.conf.js")
@KarmaTestSuiteRunner.KarmaRemoteServerPort(9889)
public class JavaScriptUnitTestKarmaSuite {
}