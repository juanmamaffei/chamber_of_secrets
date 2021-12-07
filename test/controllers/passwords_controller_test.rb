require "test_helper"

class PasswordsControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get passwords_dashboard_url
    assert_response :success
  end

  test "should get create_pass" do
    get passwords_create_pass_url
    assert_response :success
  end

  test "should get update_pass" do
    get passwords_update_pass_url
    assert_response :success
  end

  test "should get delete_pass" do
    get passwords_delete_pass_url
    assert_response :success
  end
end
