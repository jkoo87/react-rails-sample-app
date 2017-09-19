require 'test_helper'

class AppoinmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get appoinments_index_url
    assert_response :success
  end

end
