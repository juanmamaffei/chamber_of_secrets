Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # This is temporary... It should be replaced with environment variables.
    origins "http://localhost:3000"
    
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true

  end

  allow do
    # This is temporary... It should be replaced with environment variables.
    origins "http://localhost:5000"
    
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true

  end

end