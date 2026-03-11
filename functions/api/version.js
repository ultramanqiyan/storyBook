export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    const result = await env.DB.prepare(
      'SELECT version, description, created_at FROM version ORDER BY id DESC LIMIT 1'
    ).first();
    
    if (!result) {
      return new Response(JSON.stringify({
        success: false,
        data: null,
        error: '未找到版本信息'
      }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        version: result.version,
        description: result.description,
        created_at: result.created_at
      }
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      data: null,
      error: error.message
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
